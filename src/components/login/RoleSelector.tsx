import { useNavigate } from 'react-router-dom';
import role from '../../styles/roleSelector.module.css';
import animations from '../../styles/animations.module.css';
function RoleSelector() {
  const navigate = useNavigate();

  return (
    <div className={`${role.container} ${animations.fadeIn}`}>
      <h1>Bienvenido</h1>
      <p>Selecciona tu tipo de usuario</p>
      <div className={role.buttons}>
        <button onClick={() => navigate('/login/residente')}>Residente</button>
        <button onClick={() => navigate('/login/admin')}>Administrador</button>
      </div>
    </div>
  );
}

export default RoleSelector;
