import { AnnotationProvider } from '@/context/AnnotationContext';
import UploadPage from './upload/page';

const HomePage = () => {
  return (
    <main>
      <AnnotationProvider>
       <UploadPage/>
      </AnnotationProvider>
    </main>
  );
};

export default HomePage;
