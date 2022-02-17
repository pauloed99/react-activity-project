import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import api from '../../apis/activityApi';
import ShowAddModalContext from '../../contexts/ShowAddModalContext';
import Activity from '../../models/activity';
import ActivityGroup from '../../models/activityGroup';
import ActivityCardComponent from '../activityCard/ActivityCardComponent';
import AddActivityModalComponent from '../modals/activity/AddActivityModalComponent';

interface ActivityGroupProps {
    activityGroup: ActivityGroup
}

const ActivityCardListComponent: React.FC<ActivityGroupProps> = ({activityGroup}) => {
    const [activities, setActivities] = useState<Activity[]>();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const {showAddModal, setShowAddModal} = useContext(ShowAddModalContext);

    useEffect(() => {
        const getAllActivities = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await api.get<Activity[]>(
                    `activityGroups/${activityGroup.id}/activities`
                );
                setActivities(response.data);
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        }
        getAllActivities();
    }, [])

    return (
        <>
            {   
                error ? <p>Não foi possível carregar as atividades do grupo!</p> :
                loading ? 
                <Spinner animation="border" role="status" /> :   
                activities?.map((activity) => {
                    return (
                        <ActivityCardComponent activity={activity} key={activity.id}
                        setActivities={setActivities} />
                    );
                })
            }
            <AddActivityModalComponent
                showModal={showAddModal}
                setShowModal={setShowAddModal}
                setActivities={setActivities}
                activityGroupId={activityGroup.id}
            />
        </>
    );
}

export default ActivityCardListComponent;