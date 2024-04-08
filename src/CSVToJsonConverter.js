import React from 'react';
import './App.css'; // Import CSS file for styling

class CSVToJsonConverter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: ""
        };
    }

    csvToJson = (csv) => {
        const lines = csv.split('\n');
        const headers = lines[0].split(';');
        const jsonData = { "schedule": [] };
    
        for (let i = 1; i < lines.length; i++) {
            const currentLine = lines[i].split(';');
            const scheduleItem = {};
            for (let j = 0; j < headers.length; j++) {
                const header = headers[j].trim();
                let value = currentLine[j].trim();
    
                if (header === 'startDate' || header === 'endDate') {
                    // Check if date is in correct format (YYYY-MM-DDTHH:mm:ss±HH:mm)
                    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{4}$/;
                    if (!dateRegex.test(value)) {
                        this.setState({ errorMessage: `Invalid date format in ${header} field at line ${i + 1}` });
                        return null;
                    }
                }
    
                if (header === 'airing' || header === 'final') {
                    value = value.toLowerCase() === 'true';
                } else if (header === 'week' || header === 'homescore' || header === 'awayscore') {
                    value = parseInt(value, 10);
                } else if (header === 'conference') {
                    // Split the value by comma and trim each part
                    value = value.split(';').map(part => part.trim());
                }
    
                scheduleItem[header] = value;
            }
            jsonData.schedule.push(scheduleItem);
        }
    
        return JSON.stringify(jsonData, null, 4);
    };

    handleFile = (event) => {
        const file = event.target.files[0];
        this.setState({ errorMessage: "" }); // Clear previous error message
        const reader = new FileReader();
        reader.onload = (event) => {
            const csv = event.target.result;
            const jsonData = this.csvToJson(csv);
            if (jsonData !== null) {
                this.downloadJson(jsonData);
                this.setState({ errorMessage: "" });
    
                // Reset file input value
                event.target.value = null;
            }
        };
        reader.readAsText(file);
    };

    downloadJson = (data) => {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'schedule.json';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    };

    resetState = () => {
        this.setState({ errorMessage: "" });
    };

    render() {
        return (
            <div>
                <label className="file-input">
                <input 
                key={this.state.errorMessage} 
                type="file" 
                onClick={this.resetState} 
                onChange={this.handleFile} 
                accept=".csv"
                />
                Browse File
                </label>
                {this.state.errorMessage && <div style={{ color: 'red' }}>{this.state.errorMessage}</div>}
            </div>
        );
    }
}

export default CSVToJsonConverter;
