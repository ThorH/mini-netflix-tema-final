import {
    ProfileContainer
} from "./ProfileStyle"
import { BackToHomeContainer } from "../../AppStyles";
import { BiArrowBack } from "react-icons/bi"
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser"

function Profile() {
    const { userLogged } = useUser()

    return (
        <ProfileContainer data-testid="profileContainer">
            <BackToHomeContainer>
                <Link to="/">
                    <BiArrowBack size={30} color="#ffffff" />
                </Link>
            </BackToHomeContainer>
            <h2>{userLogged?.name}</h2>
            <img src={userLogged?.picture} alt={`${userLogged?.name} picture`} />
            <p>Email: {userLogged?.email}</p>
            <p>Country: {userLogged?.country}</p>
        </ProfileContainer>
    )
}

export default Profile;