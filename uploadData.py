import sqlite3
import csv

def create_table(cursor, columns):
    cursor.execute(f'CREATE TABLE IF NOT EXISTS datas (age INT,cholesterol FLOAT,blood_pressure TEXT);')

def insert_data(cursor, data):
    placeholders = ', '.join(['?' for _ in range(len(data))])
    cursor.execute(f'INSERT INTO datas VALUES ({placeholders});', data)

def csv_to_sqlite(csv_file, db_file):
    # Connect to SQLite database
    conn = sqlite3.connect(db_file)
    cursor = conn.cursor()

    # Read CSV file
    with open(csv_file, 'r') as csvfile:
        csv_reader = csv.reader(csvfile)
        columns = next(csv_reader)  # Assume the first row contains column names

        # Create table in SQLite with columns from CSV
        create_table(cursor, columns)

        # Insert data from CSV into SQLite
        for row in csv_reader:
            insert_data(cursor, row)

    # Commit and close the connection
    conn.commit()
    conn.close()

if __name__ == "__main__":
    csv_file_path = './dataset20231130.csv'  # Replace with your CSV file path
    sqlite_db_path = './patients.db'  # Replace with your SQLite database path

    csv_to_sqlite(csv_file_path, sqlite_db_path)
    print(f'Data from {csv_file_path} transferred to {sqlite_db_path}.')
