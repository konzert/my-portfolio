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

package com.google.sps.data;

/**
 * Comments class for adding comment objects to comment arraylist
 */
public final class Comment {

  private final String firstName;
  private final String lastName;
  private final String comment;
  private final String score;

  public Comment (String firstName, String lastName, String comment, String score) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.comment = comment;
    this.score = score;
  }
}