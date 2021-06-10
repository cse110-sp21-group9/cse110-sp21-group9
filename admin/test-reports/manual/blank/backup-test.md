# Manual Tests for Backup/Load feature
## I. Test Information
**Tester:**  
**Test Date:**     

## II. Test cases
| Test # | Test Description           | Test Steps                                                                                                                                                                                                    | Expected Results                                                                                                 | Actual Results | P/F? |
|--------|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|----------------|------|
| 1      | Check backup file download | <ol><li>Create a bullet with the following parameters: <ul><li>Title: TestEvent</li><li>Type: Event</li><li>Hour: 4 PM</li><li>Content:TestContent</li></ul></li><li>Click backup button in settings</li><ol> | <ol><li>Event bullet named 'TestEvent' should appear on page at 4 PM</li><li>backup.txt should download</li><ol> |                |      |
| 2      | Check backup file load     | <ol><li>Clear localStorage in browser</li><li>Upload file using load feature in settings</li></ol>                                                                                                            | <ol><li>Bullets should disappear</li><li>Event bullet should reappear at 4 PM</li><ol>                           |                |      |
| 3      | Clean up test          | Clear localStorage | Bullets should disappear |          |         |   