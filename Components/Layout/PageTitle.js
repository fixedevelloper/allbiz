import { useSession } from "next-auth/react";

const PageTitle = () => {
    const { data: session, status } = useSession();

    // Si la session n'est pas encore chargée ou pas authentifiée
    if (status !== "authenticated") {
        return null; // ou loader/spinner si tu veux
    }

    return (
        <div className="page_title section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="page_title-content">
                            <p>
                                Content de te revoir,
                                <span> {session.user?.name || session.user?.email}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageTitle;
