
import { useState } from 'react';
import { useMetricsData } from './useMetricsData';
import { useExpensesData } from './useExpensesData';
import { useClientData } from './useClientData';
import { useChartData } from './useChartData';
import { ClientVisit } from '@/lib/types';

interface UseDashboardDataReturn {
  isLoading: boolean;
  error: Error | null;
  data: {
    metrics: any;
    expenses: any;
    clients: ClientVisit[];
    chartData: {
      barData: any[];
      lineData: any[];
      pieData: any[];
    };
  };
  refreshData: () => Promise<void>;
}

export const useDashboardData = (): UseDashboardDataReturn => {
  const [error, setError] = useState<Error | null>(null);
  
  // Use our separated hooks
  const metricsData = useMetricsData();
  const expensesData = useExpensesData();
  const clientData = useClientData();
  
  // Calculate chart data based on metrics data and the current period
  const period = 'monthly'; // Default to monthly
  const chartData = useChartData(
    period,
    {
      daily: metricsData.data?.daily || null,
      weekly: metricsData.data?.weekly || null,
      monthly: metricsData.data?.monthly || null
    },
    {
      daily: expensesData.expenses?.daily || 0,
      weekly: expensesData.expenses?.weekly || 0,
      monthly: expensesData.expenses?.monthly || 0
    }
  );
  
  // Determine overall loading state
  const isLoading = metricsData.isLoading || expensesData.loading || clientData.loading;
  
  // Function to refresh all data
  const refreshData = async () => {
    try {
      await Promise.all([
        metricsData.refreshData(),
        expensesData.refreshData(),
        clientData.refreshData()
      ]);
    } catch (err) {
      console.error("Error refreshing dashboard data:", err);
      setError(err instanceof Error ? err : new Error('Unknown error refreshing data'));
    }
  };
  
  // Combine data for component consumption
  const combinedData = {
    metrics: metricsData.data || {},
    expenses: expensesData.expenses || { daily: 0, weekly: 0, monthly: 0 },
    clients: clientData.frequentClients || [],
    chartData: chartData || { barData: [], lineData: [], pieData: [] }
  };
  
  return {
    isLoading,
    error: error || metricsData.error || expensesData.error || clientData.error,
    data: combinedData,
    refreshData
  };
};
