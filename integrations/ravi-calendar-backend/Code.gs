const ROOM_COUNT = 10;
const TIME_ZONE = "America/New_York";
const MAX_RANGE_DAYS = 366;

function doGet(e) {
  try {
    const startText = String((e && e.parameter && e.parameter.start) || "");
    const endText = String((e && e.parameter && e.parameter.end) || "");
    const start = parseDate_(startText);
    const end = parseDate_(endText);

    if (!start || !end || end <= start) {
      return json_({ ok: false, error: "Use valid start and end dates in YYYY-MM-DD format." });
    }

    const days = Math.round((end - start) / 86400000);
    if (days > MAX_RANGE_DAYS) {
      return json_({ ok: false, error: "Date range is too long." });
    }

    const calendarsByName = {};
    CalendarApp.getAllCalendars().forEach(function(calendar) {
      calendarsByName[calendar.getName().trim().toLowerCase()] = calendar;
    });

    const rooms = [];
    for (let room = 1; room <= ROOM_COUNT; room += 1) {
      const calendar = calendarsByName[("Room " + room).toLowerCase()];
      if (!calendar) {
        rooms.push({ id: room, available: null, blocked: [], error: "Calendar not found" });
        continue;
      }

      const blocked = calendar.getEvents(start, end)
        .filter(function(event) {
          return !/\bavailable\b/i.test(event.getTitle() || "");
        })
        .map(function(event) {
          return {
            start: Utilities.formatDate(event.getStartTime(), TIME_ZONE, "yyyy-MM-dd"),
            end: Utilities.formatDate(event.getEndTime(), TIME_ZONE, "yyyy-MM-dd")
          };
        });

      rooms.push({
        id: room,
        available: blocked.length === 0,
        blocked: mergeRanges_(blocked)
      });
    }

    return json_({
      ok: true,
      generatedAt: new Date().toISOString(),
      start: startText,
      end: endText,
      rooms: rooms
    });
  } catch (error) {
    return json_({ ok: false, error: "Availability could not be checked." });
  }
}

function parseDate_(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parts = value.split("-").map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
  if (
    date.getFullYear() !== parts[0] ||
    date.getMonth() !== parts[1] - 1 ||
    date.getDate() !== parts[2]
  ) return null;
  return date;
}

function mergeRanges_(ranges) {
  const sorted = ranges.slice().sort(function(a, b) {
    return a.start.localeCompare(b.start);
  });
  return sorted.reduce(function(merged, range) {
    const last = merged[merged.length - 1];
    if (last && range.start <= last.end) {
      if (range.end > last.end) last.end = range.end;
    } else {
      merged.push({ start: range.start, end: range.end });
    }
    return merged;
  }, []);
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
