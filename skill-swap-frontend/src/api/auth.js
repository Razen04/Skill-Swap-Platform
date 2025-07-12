export const registerUser = async (formData) => {
    const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: formData,
    });
    return res.json();
};

export const loginUser = async (formData) => {
    const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: formData,
        credentials: "include",
    });
    return res.json();
};