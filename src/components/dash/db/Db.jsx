import React from 'react';
import { API_URL, ENDPOINTS } from "../../../auth/api";
import { getTokenFromCookie } from "../../../auth/localdt";
import axios from "axios";
const Db = () => {

    const [backupStatus, setBackupStatus] = React.useState(null);
    const [restoreStatus, setRestoreStatus] = React.useState(null);
    const token = getTokenFromCookie();

    const handleBackup = async () => {
        try {
            const response = await axios.get(`${API_URL}/${ENDPOINTS.BEKDB}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            });
            setBackupStatus(response.data.message);
        } catch (error) {
            console.error('Backup failed:', error);
            setBackupStatus('Backup failed');
        }
    };

    const handleRestore = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('sql_file', event.target[0].files[0]);

        try {
            const response = await axios.post(`${API_URL}/${ENDPOINTS.RESDB}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setRestoreStatus(response.data.message);
        } catch (error) {
            console.error('Restore failed:', error);
            setRestoreStatus('Restore failed');
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Backup Database</h2>
                <button onClick={handleBackup} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Backup Database
                </button>
                <p className="text-sm text-gray-600">{backupStatus}</p>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Restore Database</h2>
                <form onSubmit={handleRestore} className="flex flex-col gap-2">
                    <input type="file" name="sql_file" required className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" />
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Restore Database
                    </button>
                </form>
                <p className="text-sm text-gray-600">{restoreStatus}</p>
            </div>
        </div>
    );
}

export default Db;
