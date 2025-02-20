// import React from "react";
import { useAppSelector } from '../app/hooks';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { EuiFlexGroup, EuiCard, EuiImage, EuiFlexItem } from '@elastic/eui';
import dashboard1 from '../assets/dashboard1.png';
import dashboard2 from '../assets/dashboard2.png';
import dashboard3 from '../assets/dashboard3.png';

function Dashboard() {
    useAuth();
    const navigate = useNavigate();

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    height: '100vh',
                    flexDirection: 'column',
                }}
            >
                <EuiFlexGroup
                    justifyContent="center"
                    alignItems="center"
                    style={{ margin: '5vh 10vw' }}
                >
                    <EuiFlexItem>
                        <EuiCard
                            icon={
                                <EuiImage
                                    size="100%"
                                    alt="icon"
                                    src={dashboard1}
                                />
                            }
                            title={'Create Meeting'}
                            description={
                                'Create a new meeting and invite people.'
                            }
                            onClick={() => navigate('/create')}
                            paddingSize="xl"
                        />
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiCard
                            icon={
                                <EuiImage
                                    size="100%"
                                    alt="icon"
                                    src={dashboard2}
                                />
                            }
                            title={'My Meetings'}
                            description={'View your scheduled meetings'}
                            onClick={() => navigate('/meetings')}
                            paddingSize="xl"
                        />
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <EuiCard
                            icon={
                                <EuiImage
                                    size="100%"
                                    alt="icon"
                                    src={dashboard3}
                                />
                            }
                            title={'Meetings'}
                            description={
                                'View the meetings you are invited to.'
                            }
                            onClick={() => navigate('/create')}
                            paddingSize="xl"
                        />
                    </EuiFlexItem>
                </EuiFlexGroup>
            </div>
        </>
    );
}

export default Dashboard;
