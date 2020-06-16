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

package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;

import java.util.*;
import com.google.gson.Gson;



/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

//   List<String> commentList = new ArrayList<String>();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Comment");

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<String> commentList = new ArrayList<String>();

    for (Entity entity : results.asIterable()) {
      String firstName = (String) entity.getProperty("firstName");
      String lastName = (String) entity.getProperty("lastName");
      String comment = (String) entity.getProperty("comment");
      String commentItem = firstName + " " + lastName + " : " + comment;
      commentList.add(commentItem);
    }

    String json = convertToJson(commentList);
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  private String convertToJson(List<String> list) {
    Gson gson = new Gson();
    String json = gson.toJson(list);
    return json;
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // // Get the input from the form.
    String firstName = getParameter(request, "firstname", "");
    String lastName = getParameter(request, "lastname", "");
    String comment = getParameter(request, "comment", "");
    // String commentItem = getParameter(request, "firstname", "") + " " + getParameter(request, "lastname", "") + " : " + getParameter(request, "comment", "");
    // commentList.add(commentItem);

    // // response.sendRedirect("/index.html");
    // response.setContentType("text/html;");
    // response.getWriter().println(commentList);

    Entity taskEntity = new Entity("Comment");
    taskEntity.setProperty("firstName", firstName);
    taskEntity.setProperty("lastName", lastName);
    taskEntity.setProperty("comment", comment);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(taskEntity);
  }

  /**
   * @return the request parameter, or the default value if the parameter
   *         was not specified by the client
   */
  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
}


