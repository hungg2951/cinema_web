import { notification } from "antd";
import styles from "./auth.module.scss";
type Props = {};

const SignUpSocial = (props: Props) => {
   const loginFb = () => {
      notification.info({message: 'Chức năng này chưa được hoàn thiện'})
   }

   return (
      <div className="flex justify-between">
         <button type="button" className={styles.loginGG} >
         <a href={`${import.meta.env.VITE_API_ONLINE}/auth/google`}>Đăng nhập google</a>
         </button>
         <button type="button" className={styles.loginFb} onClick={loginFb} >
            Sign in with Facebook
         </button>
      </div>
   );
};

export default SignUpSocial;
