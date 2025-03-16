import { Container, Typography, Card, CardContent } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md">
      <Card sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom>
            על האתר
          </Typography>
          <Typography variant="body1">
            ברוכים הבאים לאתר המתכונים שלנו! כאן תמצאו מגוון רחב של מתכונים טעימים לכל ארוחה.
            האתר מאפשר לכם לגלות מתכונים חדשים, לשתף את המתכונים האהובים עליכם, וליצור חוויית בישול קלה ומהנה.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            בין אם אתם בשלנים מתחילים או שפים מקצועיים, יש כאן משהו לכל אחד! 
            נסו את המתכונים שלנו והפתיעו את המשפחה והחברים עם טעמים מדהימים.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;
