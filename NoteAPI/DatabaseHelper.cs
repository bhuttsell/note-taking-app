using Microsoft.Data.Sqlite;

public class DatabaseHelper
{
    private string connectionString = "Data Source=notes.db";

    // This creates the database file and table if they don't exist
    public void InitializeDatabase()
    {
        using (var connection = new SqliteConnection(connectionString))
        {
            connection.Open();

            string createTableQuery = @"
                CREATE TABLE IF NOT EXISTS Notes (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Note TEXT NOT NULL
                )";

            using (var command = new SqliteCommand(createTableQuery, connection))
            {
                command.ExecuteNonQuery();
            }
        }
    }

    // GET existing Notes when app starts
    public List<NoteItem> GetAllNotes()
    {
        var notesList = new List<NoteItem>();

        using (var connection = new SqliteConnection(connectionString))
        {
            connection.Open();

            string selectQuery = @"SELECT Id, Note 
                                   FROM Notes";

            using (var command = new SqliteCommand(selectQuery, connection))
            {
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        notesList.Add(new NoteItem
                        {
                            Id = reader.GetInt32(0),
                            Note = reader.GetString(1)
                        });
                    }
                }
            }
        }

        return notesList;
    }

    // This saves a new note to the database
    public NoteItem AddNote(string noteText)
    {
        using (var connection = new SqliteConnection(connectionString))
        {
            connection.Open();

            string insertQuery = @"INSERT INTO Notes (Note)
                                   VALUES (@note)";

            using (var command = new SqliteCommand(insertQuery, connection))
            {
                command.Parameters.AddWithValue("@note", noteText);
                command.ExecuteNonQuery();

                // Get the ID of the note we just inserted
                string getIdQuery = "SELECT last_insert_rowid()";
                using (var idCommand = new SqliteCommand(getIdQuery, connection))
                {
                    long newId = (long)idCommand.ExecuteScalar();

                    // Return the full note object
                    return new NoteItem
                    {
                        Id = (int)newId,
                        Note = noteText
                    };
                }
            }
        }
    }

    // This updates an existing note in the database
    public void UpdateNote(int id, string noteText)
    {
        using (var connection = new SqliteConnection(connectionString))
        {
            connection.Open();

            string updateQuery = @"UPDATE Notes
                                   SET Note = @note
                                   WHERE Id = @id";

            using (var command = new SqliteCommand(updateQuery, connection))
            {
                command.Parameters.AddWithValue("@note", noteText);
                command.Parameters.AddWithValue("@id", id);
                command.ExecuteNonQuery();
            }
        }
    }

    public void DeleteNote(int id)
    {
        using (var connection = new SqliteConnection(connectionString))
        {
            connection.Open();

            string deleteQuery = @"DELETE FROM Notes
                                   WHERE Id = @id";

            using (var command = new SqliteCommand(deleteQuery, connection))
            {
                command.Parameters.AddWithValue("@id", id);
                command.ExecuteNonQuery();
            }
        }
    }
}

public class NoteItem
{
    public int Id { get; set; }
    public string Note { get; set; }
}