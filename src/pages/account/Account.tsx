import { isPlatform, IonAvatar, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonToast, IonButton, IonRouterLink, useIonRouter } from '@ionic/react';
import {
    chevronForward,
    pencilOutline,
    locationOutline,
    heartOutline,
    timeOutline,
    receiptOutline,
    cardOutline,
    notificationsOutline,
    closeCircle,
    chevronForwardOutline,
    powerOutline
} from 'ionicons/icons'; 
import { useEffect, useState } from 'react';
import Header from '../../components/HeaderComponent';
import { useStateContext } from '../../provider/ContextProvider';
import { getService, postService, serviceStatus } from '../../services/httpServices';

const Account: React.FC = () => {
    // Platform
    const isIos = isPlatform('ios');

    // Context
    const {user, setUser, setToken} = useStateContext();

    // States
    const [isOpenToast, setIsOpenToast] = useState(true);
    
    // Routes
    const pageNavigation = useIonRouter();

    useEffect(() => {
        authChecker();
    }, [])

    const authChecker = function () {
        if (localStorage.getItem('ACCESS_TOKEN') === null) return false;
        getService('/user').then((data) => {
            serviceStatus(data.status)
            setUser(data.data);
        });
    }

    // Redirects
    const goToLogin = () => {
        pageNavigation.push('/login', 'root', 'replace');
    }

    const goToProfile = () => {
        pageNavigation.push('/app/profile', 'root', 'replace');
    }

    const goToWisthList = () => {
        pageNavigation.push('/app/wishlist', 'root', 'replace');
    }

    const goToOrders = () => {
        pageNavigation.push('/app/orders', 'root', 'replace');
    }

    const goToTrackOrders = () => {
        pageNavigation.push('/app/track/orders', 'root', 'replace');
    }

    const goToCards = () => {
        pageNavigation.push('/app/cards', 'root', 'replace');
    }

    const goToNotifications = () => {
        pageNavigation.push('/app/notifications', 'root', 'replace');
    }

    const goToShipping = () => {
        pageNavigation.push('/app/shipping', 'root', 'replace');
    }

    const logout = () => {
        postService('/logout', {}).then(() => {
            setUser(null);
            setToken(null);
            localStorage.removeItem('ACCESS_TOKEN');
        })
    }
    
    return (
        <IonPage>
            <Header />
            <IonContent className="ion-padding">
                <IonGrid>
                    {user ? 
                        <IonRow>
                            <IonCol size="4">
                                <IonAvatar>
                                    <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" className='profile'/>
                                </IonAvatar>
                            </IonCol>
                            <IonCol>
                                <h1>{user.name}</h1>
                                <p>{user.email}</p>
                            </IonCol>
                        </IonRow>
                        :
                        <>
                            <IonRow>
                                <IonCol>
                                    <IonButton expand='full' onClick={goToLogin}>
                                        Login
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className='center'>
                                    <IonRouterLink routerLink='/signup'>Sign Up</IonRouterLink>
                                </IonCol>
                            </IonRow>
                        </>
                    }
                    <IonRow>
                        <IonCol>
                            <IonList>
                                <IonItem button key="profile" onClick={goToProfile}>
                                    <IonIcon icon={pencilOutline} slot="start" className='profileIcons'></IonIcon>
                                    <IonLabel>Edit Profile</IonLabel>
                                    {isIos ? <></> : <IonIcon icon={chevronForwardOutline} slot="end"></IonIcon>}
                                </IonItem>
                                <IonItem button key="shipping" onClick={goToShipping}>
                                    <IonIcon icon={locationOutline} slot="start" className='profileIcons'></IonIcon>
                                    <IonLabel>Shipping Address</IonLabel>
                                    {isIos ? <></> : <IonIcon icon={chevronForwardOutline} slot="end"></IonIcon>}
                                </IonItem>
                                <IonItem button key="wishlist" onClick={goToWisthList}>
                                    <IonIcon icon={heartOutline} slot="start" className='profileIcons'></IonIcon>
                                    <IonLabel>Wishlist</IonLabel>
                                    <IonCard className='tagCard'>
                                        <IonCardContent>New</IonCardContent>
                                    </IonCard>
                                    {isIos ? <></> : <IonIcon icon={chevronForward} slot="end"></IonIcon>}
                                </IonItem>
                                <IonItem button key="history" onClick={goToOrders}>
                                    <IonIcon icon={timeOutline} slot="start" className='profileIcons'></IonIcon>
                                    <IonLabel>Order History</IonLabel>
                                    {isIos ? <></> : <IonIcon icon={chevronForward} slot="end"></IonIcon>}
                                </IonItem>
                                <IonItem button key="order" onClick={goToTrackOrders}>
                                    <IonIcon icon={receiptOutline} slot="start" className='profileIcons'></IonIcon>
                                    <IonLabel>Track Order</IonLabel>
                                    {isIos ? <></> :<IonIcon icon={chevronForward} slot="end"></IonIcon>}
                                </IonItem>
                                <IonItem button key="cards" onClick={goToCards}>
                                    <IonIcon icon={cardOutline} slot="start" className='profileIcons'></IonIcon>
                                    <IonLabel>Cards</IonLabel>
                                    {isIos ? <></> :<IonIcon icon={chevronForward} slot="end"></IonIcon>}
                                </IonItem>
                                <IonItem button key="notifications" onClick={goToNotifications}>
                                    <IonIcon icon={notificationsOutline} slot="start" className='profileIcons'></IonIcon>
                                    <IonLabel>Notifications</IonLabel>
                                    {isIos ? <></> :<IonIcon icon={chevronForward} slot="end"></IonIcon>}
                                </IonItem>

                                {
                                    user ?
                                    <IonItem button key="logout" onClick={logout}>
                                        <IonIcon icon={powerOutline} slot="start" className='profileIcons'></IonIcon>
                                        <IonLabel>Logout</IonLabel>
                                        {isIos ? <></> :<IonIcon icon={chevronForward} slot="end"></IonIcon>}
                                    </IonItem>
                                    :
                                    <></>
                                }
                            </IonList>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {/* Toast */}
                <IonToast
                    isOpen={isOpenToast}
                    message="Got a component with the name 'index' for the ..."
                    buttons={[{
                        side: 'start',
                        text: '11',
                        cssClass: 'chipEmbed'
                    }, {
                        side: 'end',
                        icon: closeCircle,
                        handler: () => {setIsOpenToast(false)}
                    }]}
                />
            </IonContent>
        </IonPage>
    );
};

export default Account;
