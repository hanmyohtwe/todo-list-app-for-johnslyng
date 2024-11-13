using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Linq;

namespace TodoApp
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSingleton<ITodoRepository, TodoRepository>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }

    [ApiController]
    [Route("api/todo")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepository _todoRepository;

        public TodoController(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Todo>> GetTodos()
        {
            return Ok(_todoRepository.GetAll());
        }

        [HttpPost]
        public ActionResult<Todo> AddTodo([FromBody] Todo todo)
        {
            var newTodo = _todoRepository.Add(todo);
            return CreatedAtAction(nameof(GetTodos), new { id = newTodo.Id }, newTodo);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id)
        {
            var deleted = _todoRepository.Delete(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPut("{id}")]
        public ActionResult<Todo> UpdateTodoStatus(int id, [FromBody] bool isComplete)
        {
            var updatedTodo = _todoRepository.UpdateStatus(id, isComplete);
            if (updatedTodo == null)
            {
                return NotFound();
            }

            return Ok(updatedTodo);
        }
    }

    public interface ITodoRepository
    {
        IEnumerable<Todo> GetAll();
        Todo Add(Todo todo);
        bool Delete(int id);
        Todo UpdateStatus(int id, bool isComplete); // Added UpdateStatus method to interface
    }

    public class TodoRepository : ITodoRepository
    {
        private readonly List<Todo> _todos = new List<Todo>();
        private int _nextId = 1;

        public IEnumerable<Todo> GetAll()
        {
            return _todos;
        }

        public Todo Add(Todo todo)
        {
            todo.Id = _nextId++;
            _todos.Add(todo);
            return todo;
        }

        public bool Delete(int id)
        {
            var todo = _todos.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return false;
            }
            _todos.Remove(todo);
            return true;
        }

        public Todo UpdateStatus(int id, bool isComplete) // Added UpdateStatus method
        {
            var existingTodo = _todos.FirstOrDefault(t => t.Id == id);
            if (existingTodo != null)
            {
                existingTodo.IsComplete = isComplete;
            }
            return existingTodo;
        }
    }

    public class Todo
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public bool IsComplete { get; set; }
    }
}
