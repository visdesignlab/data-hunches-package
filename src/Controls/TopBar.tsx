import { AppBar, ButtonGroup, IconButton, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { NonCapButton, useStyles } from "../Interfaces/StyledComponents";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useContext } from "react";
import Store from "../Interfaces/Store";
import GeneralControl from "./GeneralControl";
import DemoOptionButtons, { TopBarProps } from "./DemoOptionButtons";


const TopBar: FC<TopBarProps> = ({ showTable, makeShowTable }: TopBarProps) => {
    const styles = useStyles();
    const store = useContext(Store);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const responseGoogle = (response: any) => {
        store.setUserName(response.profileObj.name);
    };

    return <AppBar position="static" color="transparent" elevation={2} style={{ zIndex: 3 }}>
        <Toolbar>

            <Typography variant="h6" style={{ paddingRight: '5px' }}>
                Data Hunches
            </Typography>
            <GeneralControl />
            <div className={styles.rightToolbar}>

                {/* Only show vol on logged in*/}
                {store.userName ?
                    <DemoOptionButtons showTable={showTable} makeShowTable={makeShowTable} /> : <></>
                }

                {store.userName ?
                    <IconButton
                        onClick={handleMenu}
                        size='small'
                        color="primary">
                        <AccountCircle />
                    </IconButton> :
                    <ButtonGroup
                    >
                        <NonCapButton
                            size='small'
                            variant='outlined'
                            onClick={() => { store.setUserName('Guest'); }}
                            color='primary'>
                            Continue as Guest
                        </NonCapButton>

                        <GoogleLogin
                            clientId="565250402151-jseb9mfqk3tumg1q6vcgklmovro4h9b4.apps.googleusercontent.com"
                            render={renderProps => (
                                <NonCapButton onClick={renderProps.onClick}
                                    size='small'
                                    variant="outlined"
                                    color="primary"
                                    disabled={renderProps.disabled}>
                                    Sign in with Google
                                    <AccountCircle />
                                </NonCapButton>
                            )}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={() => { console.log('failed'); }}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={false}
                        />
                    </ButtonGroup>}
            </div>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <GoogleLogin
                    clientId="565250402151-jseb9mfqk3tumg1q6vcgklmovro4h9b4.apps.googleusercontent.com"
                    render={renderProps => (
                        <MenuItem
                            key={'change-account'}
                            onClick={() => {
                                handleClose();
                                renderProps.onClick();
                            }}>
                            Change Account
                        </MenuItem>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={() => { console.log('failed'); }}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                />
                <GoogleLogout
                    clientId="565250402151-jseb9mfqk3tumg1q6vcgklmovro4h9b4.apps.googleusercontent.com"
                    onLogoutSuccess={() => { store.setUserName(''); }}
                    onFailure={() => { console.log('failed'); }}
                    render={renderProps => (
                        <MenuItem
                            key={'log-out'}
                            onClick={() => { handleClose(); renderProps.onClick(); }}>
                            Log Out
                        </MenuItem>
                    )}
                />
            </Menu>
        </Toolbar>
    </AppBar>;
};

export default observer(TopBar);