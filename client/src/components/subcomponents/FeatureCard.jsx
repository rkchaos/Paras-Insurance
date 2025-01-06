import { Paper } from '@mui/material';

const FeatureCard = ({ icon: Icon, title, description }) => {
    return (
        <Paper elevation={2} sx={{
            p: 3,
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            transition: 'transform 0.3s ease',
            '&:hover': {
                transform: 'translateY(-8px)'
            },
            borderRadius: '6px',
        }}>
            <div className='flex items-center gap-2'>
                <Icon sx={{ fontSize: 40, color: '#3498db', mr: 1 }} />
                <p className='text-xl text-gray-900'>{title}</p>
            </div>
            <p className='text-sm text-black'>{description}</p>
        </Paper>
    );
}

export default FeatureCard;