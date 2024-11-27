export interface ListenersListProps {
    id: string,
    nickname: string,
    profile: string,
    categories: [],
    description?: string,
    address?: string,
    contactNumber?: string,
    email: string,
    career: [],
    education: [],
    availableTime: string[],
    formattedPrice: string,
}

export async function ListenersListAll() {

    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/listeners`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    if (res.ok) {
        const result = await res.json();

        return result.data.map((item: ListenersListProps) => ({
            id: item.id,
            nickname: item.nickname || '',
            profile: item.profile || '',
            categories: item.categories || [],
            description: item.description || '',
            address: item.address || '',
            contactNumber: item.contactNumber || '',
            email: item.email || '',
            career: item.career || [],
            education: item.education || [],
            availableTime: item.availableTime || [],
            formattedPrice: item.formattedPrice || '',
        }));
    } else {
        console.error('응답 실패');
        return [];
    }
}