import { useEffect, useState } from "react";

const useVerified = email => {
    const [isVerified, setIsVerified] = useState(false);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/verifiedseller/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsVerified(data.isVerified);

                })
        }
    }, [email])
    return [isVerified];
}

export default useVerified;