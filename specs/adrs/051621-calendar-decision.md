# Fullcalendar Aftermath
Status: Accepted

Deciders: Alan, Daisuke, Edmund, Edward, Elisa, Etienne, Evan, Kenny

Date: 5/16/2021 @ 5PM

## We can no longer user Fullcalendar so we need to rethink our development strategy
As discussed in a previous ADR, the option of using Fullcalendar was rejected due to it being an AI. As such, we need to figure out what we want to do moving forward.

## Options

# Drop the calendar completely
Fullcalendar had over 16,000 lines of code. Implementing that is going to be impossible in three weeks.

# Create a more primitive calendar ourselves
We don't need the calendar to be perfect. It just needs to be a clickable grid of days and months.

## Decision outcomes
We decided to commit to still having a calendar, albeit a more primitive one. The reasoning behind it was that a primitive calendar can still be relevant for at least the next three years (if we decide to not consider leap years) and it really is just 12 grids.