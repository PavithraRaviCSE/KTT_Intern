// Call the dataTables jQuery plugin
$(document).ready(function () {
  $('#dataTable').DataTable({
    "scrollX": true,            
    "paging": true,            
    "searching": true,          
    "info": true,              
    "lengthChange": true        
  });
});