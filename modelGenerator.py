import sqlite3
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error


# Retrieve data from SQLite database
connection = sqlite3.connect("./patients.db")
cursor = connection.cursor()
cursor.execute("SELECT age, cholesterol, blood_pressure FROM datas")
data = cursor.fetchall()
for row in data:
    print(row)
connection.close()

# Convert data to a pandas DataFrame for easier manipulation
columns = ['age', 'cholesterol', 'blood_pressure']
df = pd.DataFrame(data, columns=columns)

# Extract systolic and diastolic pressure from the 'blood_pressure' column
df['systolic'], df['diastolic'] = df['blood_pressure'].str.split("/",expand=True)
df['systolic'] = df['systolic'].astype(float)
df['diastolic'] = df['diastolic'].astype(float)

# Organize data into features and labels
# features = [(age, cholesterol) for age, cholesterol, _ in data]
# labels = [blood_pressure for _, _, blood_pressure in data]
# Organize data into features and labels
features_cols = ['age', 'cholesterol', 'systolic', 'diastolic']
label_col = 'systolic'  # You can choose 'systolic' or 'diastolic' as the target variable

X = df[features_cols]
y = df[label_col]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature Scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Model Selection and Training (Linear Regression example)
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# Model Evaluation
y_pred = model.predict(X_test_scaled)
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error:", mse)

# Prediction for new data
# Assuming you have new data
new_age = 40
new_cholesterol = 200

# Creating a new data point with the provided values
new_data_point = [(new_age, new_cholesterol, '183/62', 0)]
# Creating a DataFrame with column names
new_data_point_df = pd.DataFrame(new_data_point, columns=['age', 'cholesterol', 'systolic_diastolic', 'diastolic'])
print(new_data_point_df.dtypes) 
print(new_data_point_df.head())  # This will print the first few rows of the DataFrame

# Convert 'systolic_diastolic' to string
new_data_point_df['systolic_diastolic'] = new_data_point_df['systolic_diastolic'].astype(str)

# Extracting 'systolic' and 'diastolic' values
new_data_point_df[['systolic', 'diastolic']] = new_data_point_df['systolic_diastolic'].str.split('/', expand=True)
new_data_point_df['systolic'] = new_data_point_df['systolic'].astype(float)
new_data_point_df['diastolic'] = new_data_point_df['diastolic'].astype(float)
# Dropping the temporary 'systolic_diastolic' column
new_data_point_df = new_data_point_df.drop(columns=['systolic_diastolic'])
print("After splitting:")
print(new_data_point_df.dtypes)  # This will print the data types of each column
print(new_data_point_df.head())

# Scaling the new data point using the previously fitted scaler
new_data_point_scaled = scaler.transform(new_data_point_df[['age','cholesterol','systolic','diastolic']])
print("Scaled new data point:")
print(new_data_point_scaled)
# Making predictions using the trained model
predicted_blood_pressure = model.predict(new_data_point_scaled)


# Printing the predicted systolic blood pressure
print("Predicted Systolic Blood Pressure:", predicted_blood_pressure)