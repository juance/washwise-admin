
import React from 'react';
import Navbar from '@/components/Navbar';
import { Loading } from '@/components/ui/loading';
import ClientHeader from '@/components/clients/ClientHeader';
import ClientList from '@/components/clients/ClientList';
import AddClientForm from '@/components/clients/AddClientForm';
import LoyaltyProgram from '@/components/clients/LoyaltyProgram';
import ClientSearch from '@/components/clients/ClientSearch';
import ClientListPagination from '@/components/clients/ClientListPagination';
import ClientNotes from '@/components/clients/ClientNotes';
import ClientListSkeleton from '@/components/clients/ClientListSkeleton';
import { useClientsList } from '@/hooks/useClientsList';
import { useLoyaltyProgram } from '@/hooks/useLoyaltyProgram';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';

const Clients = () => {
  const { 
    currentClients,
    totalPages,
    currentPage,
    loading,
    error,
    newClientName,
    setNewClientName,
    newClientPhone,
    setNewClientPhone,
    isAddingClient,
    isEditingClient,
    editClientName,
    setEditClientName,
    editClientPhone,
    setEditClientPhone,
    searchQuery,
    clientNotes,
    isLoadingNotes,
    selectedClient,
    isExporting,
    handleAddClient,
    handleEditClient,
    handleSaveClient,
    handleCancelEdit,
    handleSearchChange,
    handlePageChange,
    handleSelectClient,
    saveClientNotes,
    handleExportClients,
    refreshData
  } = useClientsList();

  const {
    pointsToAdd,
    setPointsToAdd,
    pointsToRedeem,
    setPointsToRedeem,
    isAddingPoints,
    handleAddPoints,
    handleRedeemPoints
  } = useLoyaltyProgram(refreshData);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Navbar />
      <div className="flex-1 p-6 md:ml-64">
        <div className="container mx-auto max-w-6xl pt-6">
          <div className="flex justify-between items-center mb-6">
            <ClientHeader />
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshData}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Actualizar
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleExportClients}
                disabled={isExporting || loading}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {isExporting ? 'Exportando...' : 'Exportar CSV'}
              </Button>
            </div>
          </div>

          {/* Search bar */}
          <div className="mb-6">
            <ClientSearch 
              searchQuery={searchQuery} 
              onSearchChange={handleSearchChange} 
            />
          </div>

          {loading ? (
            <ClientListSkeleton />
          ) : error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="text-lg font-medium text-red-800">Error al cargar clientes</h3>
              <p className="text-red-700">{error.message}</p>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={refreshData} 
                className="mt-2"
              >
                Reintentar
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <ClientList 
                clients={currentClients}
                isEditingClient={isEditingClient}
                editClientName={editClientName}
                editClientPhone={editClientPhone}
                selectedClient={selectedClient}
                onEditClient={handleEditClient}
                onSaveClient={handleSaveClient}
                onCancelEdit={handleCancelEdit}
                onSelectClient={handleSelectClient}
                onEditNameChange={(e) => setEditClientName(e.target.value)}
                onEditPhoneChange={(e) => setEditClientPhone(e.target.value)}
              />

              {/* Pagination */}
              <ClientListPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <AddClientForm 
                    newClientName={newClientName}
                    newClientPhone={newClientPhone}
                    isAddingClient={isAddingClient}
                    onNameChange={(e) => setNewClientName(e.target.value)}
                    onPhoneChange={(e) => setNewClientPhone(e.target.value)}
                    onAddClient={handleAddClient}
                  />
                </div>
                <div>
                  <ClientNotes 
                    client={selectedClient}
                    clientNotes={clientNotes}
                    onSaveNotes={saveClientNotes}
                    isLoading={isLoadingNotes}
                  />
                </div>
              </div>

              <LoyaltyProgram 
                selectedClient={selectedClient}
                pointsToAdd={pointsToAdd}
                pointsToRedeem={pointsToRedeem}
                isAddingPoints={isAddingPoints}
                onPointsToAddChange={(e) => setPointsToAdd(parseInt(e.target.value) || 0)}
                onPointsToRedeemChange={(e) => setPointsToRedeem(parseInt(e.target.value) || 0)}
                onAddPoints={handleAddPoints}
                onRedeemPoints={handleRedeemPoints}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;
