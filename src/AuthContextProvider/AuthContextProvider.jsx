import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { auth } from "../Firebase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const AuthContextProvider = ({ children }) => {
    // all states will be here
    const [user, setUser] = useState(null);
    const [gettingUserLoading, setGettingUserLoading] = useState(true);
    const [loginLoader, setLoginLoader] = useState(true);
    const axiosPublic = useAxiosPublic()




    // sign in with google
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // sign in with facebook
    const facebookProvider = new FacebookAuthProvider();
    const signInWithFacebook = () => {
        return signInWithPopup(auth, facebookProvider)
    }

    // create user with email and password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login user with email and password
    const loginUser = (email, password) => {
        setLoginLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // update user while signing up
    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }

    // logout user
    const userLogout = () => {
        return signOut(auth)
    }

    // observer
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                const currentUserEmail = {
                    email: currentUser.email
                }
                // store token
                axiosPublic.post('/jwt', currentUserEmail)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            } else {
                // remove token
                localStorage.removeItem('access-token');
            }
            setUser(currentUser);
            setGettingUserLoading(false);
            setLoginLoader(false);
        })
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        setUser,
        signInWithGoogle,
        signInWithFacebook,
        userLogout,
        createUser,
        loginUser,
        updateUser,
        setGettingUserLoading,
        gettingUserLoading,
        loginLoader,
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthContextProvider;