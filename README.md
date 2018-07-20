# Xrecruits-FE-admin
Admin Side frontend of XRecruits Hiring Portal

Following are the functionalities along with their status:

1) www.url.com:port/admin - Login Page consisting of authentication for Admin using username and password. 
  Functionalities Completed: Admin can login after username and password are authenticated.
  Functionalities Pending: None.
After Login admin is taken to:
2) www.url.com:port/adduser - A page consisting of tabs implemented using Routes. By default admin is taken to Add User tab. 
  Functionalities Completed: Admin can add users along with their personal details(email) and the type of test(number of easy, medium, hard questions, any message, test type, language type) that they will take which are updated to the database in the backend.
  Functionalities Pending: Maintaining session storage, CSS incomplete.
3) www.url.com:port/addquestions - A tab to add questions belonging to a specific language(javascript, python etc.) or level(easy, medium, hard etc) for tests.
  Functionalities Completed: Admin can add questions( question text, question type, difficulty selection, language type) to the database.
  functionalities Pending: Maintaining session storage, CSS not made.
4) www.url.com:port/evaluate - A tab to evaulate the performance of all users. 
  Functionalities Completed: Admin can search user's tests using user email id or test type from all the user tests. User performance can be viewed by clicking on the row of the user in a popup. Admin can evaluate the textual questions and can get the final score after closing the popup.
  Functionalities Pending: CSS incomplete.
5) www.url.com:port/deleteQuestions - A tab to delete questions if not needed.
   Functionalities Completed: Admin can search the question by its type or its qid from all the questions displayed in a table. Admin can delete the question by clicking on the 'Delete Question' button for that question.
   Functionalities Pending: CSS not made.
  
