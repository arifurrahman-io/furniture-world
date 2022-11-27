import { useEffect, useState } from "react";

const useUser = email => {
    const [isUser, setIsUser] = useState(false);
    const [isUserLoading, setIsUserLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://furniture-world-server.vercel.app/user/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsUser(data.isUser);
                    setIsUserLoading(false)
                })
        }
    }, [email])
    return [isUser, isUserLoading];
}

export default useUser;