import { useEffect, useState } from "react";

const useAdvertise = id => {
    const [isAdvertised, setIsAdvertised] = useState(false);
    const [isProductLoading, setIsProductLoading] = useState(true);
    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/product/advertised/${id}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdvertised(data.isAdvertised);
                    setIsProductLoading(false)
                })
        }
    }, [id])
    return [isAdvertised, isProductLoading];
}

export default useAdvertise;