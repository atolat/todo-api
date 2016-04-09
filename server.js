var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos=[{
    id: 1,
    description: 'Task 1',
    completed: true
},{
    id: 2,
    description: 'Task 2',
    completed: false
},{
    id: 3,
    description: 'Task 3',
    completed: true
}];

app.get('/',function(req, res){
    res.send('Todo API Root');
});

//GET request to fetch todos
//GET /todos
app.get('/todos',function(req,res){
    res.json(todos);
})
//GET /todos/:id
app.get('/todos/:id',function(req,res){
    var todoId=parseInt(req.params.id);
    var matchTodo;
   // res.send("Todo item with id: "+todoId);
    
    for(var i=0; i<todos.length; i++){
        if(todos[i].id===todoId){
            matchTodo=todos[i];
        }
    }
    if(!matchTodo){
        res.status(404).send();
    }
    res.json(matchTodo);
    
    
});



app.listen(PORT,function(){
   console.log('Express listening on port:: '+PORT);
    
})