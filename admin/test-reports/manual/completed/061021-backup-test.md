# Manual Tests for Backup/Load feature
## I. Test Information
**Tester:** Alan Wang  
**Test Date:** June 10th, 2021   

## II. Test cases
| Test # | Test Description           | Test Steps                                                                                                                                                                                                    | Expected Results                                                                                                 | Actual Results | P/F? |
|--------|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|----------------|------|
| 1      | Check backup file download | <ol><li>Create a bullet with the following parameters: <ul><li>Title: TestEvent</li><li>Type: Event</li><li>Hour: 4 PM</li><li>Content:TestContent</li></ul></li><li>Click download button in settings</li><ol> | <ol><li>Event bullet named 'TestEvent' should appear on page at 4 PM</li><li>backup.txt should download</li><ol> | As expected               |  ✔️    |
| 2      | Check backup file load     | <ol><li>Clear localStorage in browser and refresh</li><li>Upload file using load file feature in settings</li></ol>                                                                                                            | <ol><li>Bullets should disappear</li><li>Event bullet should reappear at 4 PM</li><ol>                           |   As expected            |  ✔️    |
| 3      | Clean up test          | Clear localStorage and refresh page| Bullets should disappear |   As expected       |    ✔️     |   