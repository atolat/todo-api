    var express = require('express');
    var bodyParser= require('body-parser');
    var _=require('underscore');

    var app = express();
    var PORT = process.env.PORT || 3000;
    var todos=[];
    var todoId=1;

    app.use(bodyParser.json());

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
        var matchTodo= _.findWhere(todos,{id: todoId});
       // res.send("Todo item with id: "+todoId);

    //    for(var i=0; i<todos.length; i++){
    //        if(todos[i].id===todoId){
    //            matchTodo=todos[i];
    //        }
    //    }
        if(!matchTodo){
            res.status(404).send();
        }
        res.json(matchTodo);


    });

    //POST request to pass user data to app in JSON
    // POST /todos
    app.post('/todos',function(req,res){
        var body = _.pick(req.body,'description','completed'); 
       
        //Validation
        if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length===0){
            return res.status(400).send();
        }



        //console.log(body.description);
         body.description=body.description.trim();
         body.id=todoId;
            todos.push(body);
            todoId++;

        res.json(body);

    });

//DELETE /todos/:id
app.delete('/todos/:id',function(req,res){
        var todoId=parseInt(req.params.id);
        var matchTodo= _.findWhere(todos,{id: todoId});
       // res.send("Todo item with id: "+todoId);

    //    for(var i=0; i<todos.length; i++){
    //        if(todos[i].id===todoId){
    //            matchTodo=todos[i];
    //        }
    //    }
        if(!matchTodo){
            res.status(404).send();
        }
    todos=_.without(todos,matchTodo);
        res.json(matchTodo);


    });


    app.listen(PORT,function(){
       console.log('Express listening on port:: '+PORT);

    })