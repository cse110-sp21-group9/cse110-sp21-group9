# Manual Tests for Light/Dark mode feature
## I. Test Information
**Tester:** 
**Test Date:**  

## II. Test cases
| Test # | Test Description                          | Test Steps                                                                                      | Expected Results                                                                                                  | Actual Results | P/F? |
|--------|-------------------------------------------|-------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|----------------|------|
| 1      | Set Dark mode                             | <ol><li>Set Dark mode in settings modal</li><ol>                                                | Page should display in dark mode                                                                                  |                |      |
| 2      | Check if Dark mode persists between pages | <ol><li>Go to month calendar using sidebar</li><li>Click on another day in month view</li></ol> | <ol><li>Month view should display in dark mode</li><li>Day view for that day should display in dark mode</li><ol> |                |      |
| 3      | Check if Dark mode persists on refresh    | <ol><li>Refresh the page</li></ol>                                                              | Page should still display in dark mode | | 4      | Clean up test          | Clear localStorage | Page should go back to light mode |          |         |   