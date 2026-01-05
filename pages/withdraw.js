import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import Layout from '../Components/Layout/Layout';
import API from "./utils/axios";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
const Withdraws = () => {
    const router = useRouter();
    const [operators, setOperators] = useState([]);
    const ALLOWED_AMOUNTS = [
        1000, 2000, 5000, 10000, 20000, 50000, 75000, 100000
    ];


    const [form, setForm] = useState({
        amount: 0,
        phone: "",
        operator: "",
    });
    useEffect(() => {
        API.get("/operators")
            .then(res => setOperators(res.data))
            .catch(console.error);
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const amount = parseInt(form.amount);

        // 1️⃣ Validation fourchette
        if (!ALLOWED_AMOUNTS.includes(amount)) {
            toast.error("Montant invalide. Choisissez une fourchette autorisée.")
            return ;
        }

        if (!form.operator || !form.phone) {
            toast.error("Opérateur et numéro requis.")
            return;
        }

        const fee = Math.floor(amount * 0.1);
        const netAmount = amount - fee;

        if (!confirm(
            `Confirmer le retrait de ${amount} FCFA\n` +
            `Frais (10%) : ${fee} FCFA\n` +
            `Montant reçu : ${netAmount} FCFA`
        )) return;

        try {
            await API.post("/withdrawals", {
                amount,
                operator: form.operator,
                phone: form.phone,
            });
           toast.success('Operation execute avec success')
            router.push("/history");

        } catch (err) {
            toast.error(err.response?.data?.message || "Erreur withdraw")
        }
    };

    return (
        <>
            <Layout>
                <div className="accounts mb-80">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Withdraw</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            {/* Montant */}
                                            <div className="form-group">
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text"><i className="fa fa-money"></i></span>
                                                    <select
                                                        className="form-control"
                                                        value={form.amount}
                                                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                                    >
                                                        <option value="">Choisir un montant</option>
                                                        <option value="1000">1 000 FCFA</option>
                                                        <option value="2000">2 000 FCFA</option>
                                                        <option value="5000">5 000 FCFA</option>
                                                        <option value="10000">10 000 FCFA</option>
                                                        <option value="20000">20 000 FCFA</option>
                                                        <option value="50000">50 000 FCFA</option>
                                                        <option value="75000">75 000 FCFA</option>
                                                        <option value="100000">100 000 FCFA</option>
                                                    </select>

                                                    {/* <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="5000 FCFA"
                                                        value={amount}
                                                        onChange={e => setAmount(e.target.value)}
                                                    />*/}
                                                </div>
                                            </div>

                                            {/* Téléphone */}
                                            <div className="form-group">
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text"><i className="fa fa-phone"></i></span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="6XXXXXXXX"
                                                        value={form.phone}
                                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Opérateurs */}
                                            <div className="form-group">
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text"><i className="fa fa-globe"></i></span>
                                                    <select
                                                        className="form-control"
                                                        value={form.operator}
                                                        onChange={(e) => setForm({ ...form, operator: e.target.value })}
                                                    >
                                                        <option value="">-- Choisir opérateur --</option>
                                                        {operators.map(op => (
                                                            <option key={op.id} value={op.code}>
                                                                {op.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <button className="btn btn-primary w-100">
                                                Withdraw Now
                                            </button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Withdraws;