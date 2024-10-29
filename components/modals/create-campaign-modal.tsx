import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal'; // Your Modal component
import CreateCampaign from '@/components/create-campaign'; // Your CreateCampaign component

interface CreateCampaignModalProps {
    isOpen: boolean;
    onClose: () => void;
}


const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <CreateCampaign onCreate={onClose} />
       </Modal> 
    );
};

export default CreateCampaignModal;
