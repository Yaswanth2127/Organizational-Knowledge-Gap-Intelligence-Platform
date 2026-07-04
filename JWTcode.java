import java.security.SecureRandom;
import java.util.Base64;

public class JWTcode {
    public static void main(String[] args) {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[64];
        random.nextBytes(bytes);
        System.out.println(Base64.getEncoder().encodeToString(bytes));
    }
}