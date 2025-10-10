// react custom hook file 

import { useCallback, useState } from "react";
import {Alert} from 'react-native'
import { API_URL } from "../constants/api";


const useTransactions = (userId) => {

    const [transactions , setTransactions] = useState([]);
    const [summary, setSummary] = useState({balance:0 , income: 0, expense: 0 });
    const [loading, setLoading] = useState(true);

    // useCallback to memoize the function and avoid unnecessary re-renders
    const fetchTransactions = useCallback( async () => {

        try {
            const response = await fetch(`${API_URL}/transactions/${userId}`);
            const data = await response.json()
            setTransactions(data)
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }
    , [userId]);
 
    const fetchSummary = useCallback(async () => {

        try {
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`)
            const data = await response.json()
            setSummary(data)
        } catch (error) {
            console.error("Error fetching summary:", error);
        }

    } , [userId])

    const loadData = useCallback( async () => {
        if(!userId) return;

        setLoading(true);

        try {
            await Promise.all([fetchTransactions(), fetchSummary()])
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false)
        }

    } , [fetchTransactions , fetchSummary , userId])

    const deleteTransaction = async (id) => {

        try {
            const response = await fetch(`${API_URL}/transactions/${id}` , {method: `DELETE`});
            if (!response.ok) throw new Error('Failed to delete transaction');

            // Refresh after load data
            loadData();
            Alert.alert('Success', 'Transaction deleted successfully');
        } catch (error) {
            console.error("Error deleting transaction:", error);
            Alert.alert("Error", error.message);
        }
    };

    return { transactions , summary , loading , loadData , deleteTransaction};
};

export default useTransactions
