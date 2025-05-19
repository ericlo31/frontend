import React, { useEffect, useState } from "react";
import styles from "../../styles/visits.module.css";
import AllAuthorizations from "../../components/visits/VisitTable";
import { loadToken, setAuthToken } from "../../services/auth.service";
import { getAuthenticatedUser } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/user.types";

const AuthorizationRecords = () => {
  const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const token = loadToken();
        setAuthToken(token);
        setUser(await getAuthenticatedUser());
      } catch (error) {
        navigate("/");
      }
    };

    validateUser();
  }, [navigate]);

  return (user &&
    <div className={styles.section}>
      <h2>Todas las Autorizaciones</h2>
      <AllAuthorizations />
    </div>
  );
};

export default AuthorizationRecords;
