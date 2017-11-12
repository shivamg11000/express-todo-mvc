$(document).ready(function(){

  // enter todo and submit
  $('form').on('submit', function(){

      var item = $('form input');
      var todo = { item: item.val() }

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){ 
          const todos = data.map(todo => `<li>${todo.item}</li>`)
          $("#todo-table ul").html(todos)
        }
      })

      return false
  })


  // click on the todo to delete it
  $(document).on('click', 'li', function(){
      var item = $(this).text().replace(/ /g, "-")
      
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,     // url like  '/todo/get-some-milk' 
        success: function(data){
          const todos = data.map(todo => `<li>${todo.item}</li>`)
          $("#todo-table ul").html(todos)
        }
      })
  })

})
