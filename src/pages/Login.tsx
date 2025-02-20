import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    EuiProvider,
    EuiFlexItem,
    EuiFlexGroup,
    EuiImage,
    EuiSpacer,
    EuiTextColor,
    EuiText,
    EuiButton,
    EuiPanel,
} from '@elastic/eui';
import animation from '../assets/animation.gif';
import logo from '../assets/logo.png';
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from 'firebase/auth';
import { firebaseAuth, userRef } from '../utils/FirebaseConfig';
import { addDoc, getDocs, query, where } from 'firebase/firestore';
import { useAppDispatch } from '../app/hooks';
import { setUser } from '../app/slices/AuthSlice';

function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            navigate('/');
        }
    });

    const login = async () => {
        const provider = new GoogleAuthProvider();
        const {
            user: { displayName, email, uid },
        } = await signInWithPopup(firebaseAuth, provider);

        if (email) {
            const firestoreQuery = query(userRef, where('uid', '==', uid));
            const fetchedUser = await getDocs(firestoreQuery);

            if (fetchedUser.docs.length === 0) {
                await addDoc(userRef, {
                    uid,
                    name: displayName,
                    email,
                });
            }
        }

        dispatch(setUser({ uid, name: displayName, email }));
        navigate('/');
    };

    return (
        <EuiProvider colorMode="dark">
            <EuiFlexGroup
                justifyContent="center"
                alignItems="center"
                style={{ width: '100vw', height: '100vh' }}
            >
                <EuiFlexItem grow={false}>
                    <EuiPanel paddingSize="xl">
                        <EuiFlexGroup
                            justifyContent="center"
                            alignItems="center"
                        >
                            <EuiFlexItem>
                                <EuiImage src={animation} alt="logo" />
                            </EuiFlexItem>
                            <EuiFlexItem>
                                <EuiImage src={logo} alt="logo" size="230px" />
                                <EuiSpacer size="xs" />
                                <EuiText textAlign="center" grow={false}>
                                    <h3>
                                        <EuiTextColor>
                                            One Platform to
                                        </EuiTextColor>
                                        <EuiTextColor color="#0b5cff">
                                            {' '}
                                            connect
                                        </EuiTextColor>
                                    </h3>
                                </EuiText>
                                <EuiSpacer size="l" />
                                <EuiButton fill onClick={login}>
                                    Login with Google
                                </EuiButton>
                            </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiPanel>
                </EuiFlexItem>
            </EuiFlexGroup>
        </EuiProvider>
    );
}

export default Login;
