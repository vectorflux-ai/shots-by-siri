# Google Sheets Integration — Setup Guide

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it **"Shots by Siri — Quotation Leads"**
3. In Row 1, add these headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Mobile`
   - D1: `Email`
   - E1: `Wedding Date`
   - F1: `City`
   - G1: `Selected Events`
   - H1: `Total Amount (₹)`
   - I1: `Breakdown`

## Step 2: Create a Google Apps Script

1. In the same Google Sheet, click **Extensions > Apps Script**
2. Delete any existing code in the editor
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.mobile || '',
      data.email || '',
      data.weddingDate || '',
      data.city || '',
      data.selectedEvents || '',
      data.totalAmount || 0,
      data.breakdown || ''
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Shots by Siri Quote Tracker is active' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Save** (💾)
5. Name the project: **"Shots by Siri Quote Tracker"**

## Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Select type" → choose **Web app**
3. Set the following:
   - **Description**: Quote lead tracker
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Authorize the app when prompted (review permissions and allow)
6. **Copy the Web App URL** — it will look like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

## Step 4: Update the Website

1. Open `app.js`
2. Find this line near the top:
   ```javascript
   const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
   ```
3. Replace it with your actual URL:
   ```javascript
   const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```
4. Save the file

## That's it! 🎉

Now every time a customer downloads a PDF quotation, their details will automatically be saved to your Google Sheet including:
- **Timestamp** — when they downloaded the quote
- **Name & Mobile** — for follow-up
- **Email** — if provided
- **Wedding Date & City** — wedding details
- **Selected Events** — what events they're interested in
- **Total Amount** — the estimated price they saw
- **Breakdown** — detailed list of all their selections

## Testing

1. Open the website and build a test quote
2. Download the PDF
3. Check your Google Sheet — a new row should appear with all the data

## Troubleshooting

- **Data not appearing?** Make sure the Web App URL is correctly pasted in `app.js`
- **Authorization error?** Re-deploy the Apps Script and re-authorize
- **CORS issues?** The fetch uses `mode: 'no-cors'` which should work for most cases
