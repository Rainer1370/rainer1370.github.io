# Ravi room-availability endpoint

This Google Apps Script reads the ten shared calendars named `Room 1` through `Room 10` and returns date ranges only. Event titles and renter names are never returned.

## One-time deployment

1. Sign in to the Google account that can see Jag's ten room calendars.
2. Open [script.google.com](https://script.google.com/) and create a new project named **Ravi Room Availability**.
3. Replace the contents of `Code.gs` with this repository's `Code.gs`.
4. In Project Settings, enable **Show "appsscript.json" manifest file in editor**.
5. Replace the manifest with this repository's `appsscript.json`.
6. Choose **Deploy → New deployment → Web app**.
7. Set **Execute as: Me** and **Who has access: Anyone**.
8. Authorize the project and deploy.
9. Copy the deployed `/exec` URL. Put that URL in the website's `AVAILABILITY_API_URL` constant.

## Calendar convention

- Each actual booking is an event on that room's calendar.
- The event end date is the first available date (Google all-day event end dates are exclusive).
- An event with **Available** anywhere in its title is ignored.
- Guest names may remain in the private calendars; the endpoint never publishes titles.

Test URL:

```
YOUR_EXEC_URL?start=2026-10-01&end=2026-11-01
```

A successful response has `"ok": true` and room records containing only room numbers, availability, and blocked date ranges.
