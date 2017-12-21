// Alteryx Gallery API

//setup your Gallery
const setupGallery = function(){
  const galleryUrl = //"your_gallery_api_url";
  const galleryKey = //"your_gallery_api_key";
  const gallerySecret = //"your_gallery_api_secret";
  const gallery = new Gallery(galleryUrl, galleryKey, gallerySecret);
  return gallery;
}


//Define a function to run the workflow

let runWorkflow = function(workflowID,questions, gallery) {
  return new Promise(function (fulfill, reject){
    gallery.executeWorkflow('your_workflow_id', questions, function(resp){
      if (resp.status == 'Queued') {
        fulfill(resp);
      } else {
        reject(resp);
      }
    });
  });
}

// Define a function to grab the status of the job

let getWorkflowStatus = function(jobId, gallery, callback) {
  gallery.getJob(jobId, function(response) {
    //get the jobID of the workflow
    callback(response);
  });
}


// Define a function to check the status of the workflow

let checkWorkflowStatus = function(jobId, gallery, callback) {
  const inputQuestion = $('#appInterface').val()
  let noteUser = 'Workflow running for ' + inputQuestion
  $('#output').html(noteUser)
  $('#output').show();
  getWorkflowStatus(jobId, gallery, function(resp){
    if (resp.status != "Queued" && resp.status != "Running") {
      callback(jobId, resp);
    } else {
      setTimeout(function () {
        checkWorkflowStatus(jobId, gallery, callback);
      }, 2000);
    }
  });
}
// Define a function to get the app Questions
var appInterface = function(workflowID, gallery) {
  gallery.getAppQuestions(workflowID, function(questions){
    // just getting the first question -- define a for loop if you want to grab all
    // the description is the label of the interface tool
    console.log(questions[0].description);
  })
}

$(document).ready(function(){
  $('#executeWorkflow').on('click', function(){
    const gallery = setupGallery();
    const workflowID = 'your_workflow_id';
    const questions = $("#appInterface").serializeArray();
    gallery.getAppQuestions(workflowID, function(questions){
      var listStr = "<table>";
      let question = questions[0];
      listStr += '<tr><td class="name"></td><td><input type="text" class="form-control" value="' + (question.value || '') + '" name="' + question.name + '" placeholder="placeholder_for_your_app_question">';
    })
    runWorkflow(workflowID, questions, gallery)
    .then(function responseWorkflow(resp){
      console.log('Workflow is Running');
      checkWorkflowStatus(resp.id,gallery, function(jobID, resp){
        if (resp.status == 'Completed' && resp.outputs.length > 0) {
          const inputQuestionComplete = $('#appInterface').val()
          let finishedNote = 'Workflow Completed for ' + inputQuestionComplete
          $('#output').html(finishedNote);
          console.log('Workflow Finished Running')
          const link = gallery.getOutputFileURL(jobID,resp.outputs[0].id,"Raw");
          const downloadFile = '<a href='+link+'>Download File</a>'
          $('#outputFile').html(downloadFile);
        } else if (resp.status == 'Completed' && resp.disposition == 'Error') {
          $('#output').html('Error, there is something wrong with your workflow');
        }
      })
    })
  })

});
