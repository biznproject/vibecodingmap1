import html2canvas from 'html2canvas';

export const exportToMarkdown = (tree: any) => {
    let content = "# VIBE BLUEPRINT - AI SPECIFICATION\n\n";

    const sections = [
        { key: 'logic', title: 'AIM CHECK' },
        { key: 'design', title: 'LOGIC CHECK' },
        { key: 'infra', title: 'VAL CHECK' },
    ];

    sections.forEach(section => {
        content += `## ${section.title}\n`;
        if (tree[section.key].length === 0) {
            content += "_No nodes identified._\n";
        } else {
            tree[section.key].forEach((node: any, idx: number) => {
                const typeLabel = node.type === 'parallel' ? '[PARALLEL]' : `[SERIAL-Q${idx + 1}]`;
                if (node.question) {
                    content += `### ${typeLabel} ${node.question}\n`;
                } else {
                    content += `### ${typeLabel} General Specification\n`;
                }
                content += `- ${node.answer}\n\n`;
            });
        }
    });

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blueprint-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
};

export const exportToTXT = (tree: any) => {
    let content = "VIBE BLUEPRINT - AI SPECIFICATION\n";
    content += "=".repeat(40) + "\n\n";

    const sections = [
        { key: 'logic', title: 'AIM CHECK' },
        { key: 'design', title: 'LOGIC CHECK' },
        { key: 'infra', title: 'VAL CHECK' },
    ];

    sections.forEach(section => {
        content += `[${section.title}]\n`;
        content += "-".repeat(20) + "\n";
        if (tree[section.key].length === 0) {
            content += "No nodes identified.\n";
        } else {
            tree[section.key].forEach((node: any, idx: number) => {
                const typeLabel = node.type === 'parallel' ? '[PARALLEL]' : `[SERIAL-Q${idx + 1}]`;
                if (node.question) {
                    content += `${typeLabel} ${node.question}\n`;
                } else {
                    content += `${typeLabel} General Specification\n`;
                }
                content += `Answer: ${node.answer}\n\n`;
            });
        }
        content += "\n";
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blueprint-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
};
