import { useState } from 'react';
import { useSecureStore } from '../../stores/secureStore';
import { ReportViewer, ReportType } from './components/ReportViewer';

export function Reports() {
  const [activeReport, setActiveReport] = useState<ReportType>(null);
  const { patients, records, prescriptions } = useSecureStore();

  const generateSecureReport = async (type: ReportType) => {
    // Encrypt report data
    const reportData = await encryptReportData({
      type,
      data: { patients, records, prescriptions },
      timestamp: new Date(),
      signature: await signReport(type),
    });

    return reportData;
  };

  return (
    <div>
      <ReportViewer onGenerate={generateSecureReport} onExport={exportEncryptedReport} />
    </div>
  );
}
