import sqlite3
import pandas as pd

def retrieve_data(database_path, query):
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()

    try:
        cursor.execute(query)
        rows = cursor.fetchall()

        for row in rows:
            print(row)

    except sqlite3.Error as e:
        print(f"Error retrieving data: {e}")

    finally:
        conn.close()

# Example usage
database_path = './patients.db'
query = 'SELECT * FROM datas;'
retrieve_data(database_path, query)
