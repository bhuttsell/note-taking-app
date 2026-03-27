var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel to listen on HTTP
//builder.WebHost.ConfigureKestrel(serverOptions =>
//{
//    serverOptions.ListenLocalhost(5031);
//});

// Enable CORS so your React app can talk to this API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowReact");

// Initialize database when app starts
var dbHelper = new DatabaseHelper();
dbHelper.InitializeDatabase();

// POST endpoint to add a new note
app.MapPost("/api/notes", (NoteRequest request) =>
{
    if (string.IsNullOrWhiteSpace(request.Note))
    {
        return Results.BadRequest("Note cannot be empty");
    }

    dbHelper.AddNote(request.Note);
    return Results.Ok("Note Saved!");
});

app.Run();

// This class represents the data we expect from React
public class NoteRequest
{
    public string Note { get; set; }
}