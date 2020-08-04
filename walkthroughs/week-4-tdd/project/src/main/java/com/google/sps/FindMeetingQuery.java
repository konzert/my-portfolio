// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collection;

public final class FindMeetingQuery {
    
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    List<TimeRange> usedTimes = new ArrayList<>();
    ArrayList<TimeRange> availableTimes = new ArrayList<>();

    for (Event event : events) {
      Set<String> duplicateAttendees = new HashSet<String>(request.getAttendees());
      duplicateAttendees.retainAll(event.getAttendees()); // great method to retain all duplicates
      if (duplicateAttendees.size() >= 1) {
        usedTimes.add(event.getWhen()); // add if users are present
      }
    }

    int prevStart = 0;
    usedTimes.add(TimeRange.fromStartDuration(1440, 0)); // provides the end time if there is still time left after the last used time block
    Collections.sort(usedTimes, TimeRange.ORDER_BY_START); // sort in ascending order

    for (TimeRange currTime : usedTimes) {
      // case 1: if there is a gap between two used times
      if (currTime.start() > prevStart) {
        if (currTime.start() - prevStart >= request.getDuration()) {
          availableTimes.add(TimeRange.fromStartEnd(prevStart, currTime.start(), false));
        }
        prevStart = currTime.end();
      // case 2: if not just increment to the next used block
      } else if (currTime.end() > prevStart) { // if else fails nested event
        prevStart = currTime.end();
      }
    }
    return availableTimes;
  }
}
