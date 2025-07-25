import { countries, skills as importedSkills } from '@dr/utils';
import removeMarkdown from 'remove-markdown';

function findMatchingSkill(label: string) {
  return importedSkills.find((skill) => skill.value.toLowerCase() === label.toLowerCase());
}

export function processLinkedinData(data: any) {
  let newData = data;

  newData.skills = data.skills.map((userSkill: any) => {
    const match = findMatchingSkill(userSkill.label);
    return match ? match : userSkill;
  });

  newData.experience = data.experience.map((exp: any) => {
    exp.roles = exp.roles.map((role: any) => ({
      ...role,
      location_type: role.location_type || 'On-site',
      employment_type: role.employment_type || 'Full-time',
    }));
    return exp;
  });

  return newData;
}

export function formatLinkedInProfile(profile: any) {
  const shortBio = profile.summary
    ? profile.summary.split('.').slice(0, 2).join('. ').trim() + '.'
    : '';

  function getCountry(code: string): string {
    return (
      countries.find((country) => {
        const [, countryCode] = country.split('-');
        return (countryCode as string).toLowerCase() === code.toLowerCase();
      }) || ''
    );
  }

  const finalData = {
    full_name: `${profile.firstName} ${profile.lastName}`,
    headline: profile.headline || '',
    shortbio: shortBio.slice(0, 300),
    skills: (profile.skills || []).map((skill: any) => ({
      logo: '',
      label: skill,
      value: skill.toLowerCase().replace(/\s+/g, '-'),
      category: 'general',
    })),
    avatar_url: profile.pictureUrl,
    country: getCountry(profile.countryCode),
    geo_info: {
      city: profile.geoLocationName?.split(',')[0]?.trim() || '',
      state: profile.geoLocationName?.split(',')[1]?.trim() || '',
    },
    profile_link: {
      url: profile.website || '',
      text: profile.website ? 'Portfolio' : '',
    },
    experience: (profile.positions || []).map((pos: any, i: any) => ({
      a: i,
      company: pos.companyName || '',
      company_link: profile.companyLinkedinUrl || '',
      skills_used: [], // no data available, keep empty
      contribution: '',
      roles: [
        {
          start_date: pos.timePeriod?.startDate
            ? `${String(pos.timePeriod.startDate.month || 1).padStart(2, '0')}/${pos.timePeriod.startDate.year}`
            : '',
          end_date: pos.timePeriod?.endDate
            ? `${String(pos.timePeriod.endDate.month || 1).padStart(2, '0')}/${pos.timePeriod.endDate.year}`
            : '',
          headline: pos.title || '',
          location: profile.geoCountryName?.toLowerCase() || '',
          location_type: 'On-site',
          employment_type: 'Full-time',
          currently_working: pos.timePeriod?.endDate ? false : true,
        },
      ],
    })),
    socials: [],
    company: profile.companyName || '',
    education: (() => {
      const edu = profile.educations?.[0];
      return {
        university: edu?.schoolName || '',
        branch: edu?.degreeName || '',
        start_date: edu?.timePeriod?.startDate
          ? `${String(edu.timePeriod.startDate.month || 1).padStart(2, '0')}/${edu.timePeriod.startDate.year}`
          : '',
        end_date: edu?.timePeriod?.endDate
          ? `${String(edu.timePeriod.endDate.month || 1).padStart(2, '0')}/${edu.timePeriod.endDate.year}`
          : '',
        grade: 'A',
      };
    })(),
  };

  let newData = finalData;

  newData.skills = finalData.skills.map((userSkill: any) => {
    const match = findMatchingSkill(userSkill.label);
    return match ? match : userSkill;
  });

  return newData;
}

export function formatProxyCurlData(data: any) {
  function getCountry(code: string) {
    return (
      countries.find((country) => {
        const [, countryCode] = country.split('-');
        return (countryCode as string).toLowerCase() === code.toLowerCase();
      }) || ''
    );
  }

  const formatExperiences = (experiences: any) => {
    const grouped = new Map();

    experiences.forEach((pos: any, i: number) => {
      const companyKey = pos.company || `company-${i}`;
      const existing = grouped.get(companyKey);

      const role = {
        start_date: pos.starts_at
          ? `${String(pos.starts_at.month || 1)
              .toString()
              .padStart(2, '0')}/${pos.starts_at.year}`
          : '',
        end_date: pos.ends_at
          ? `${String(pos.ends_at.month || 1)
              .toString()
              .padStart(2, '0')}/${pos.ends_at.year}`
          : '',
        headline: pos.title || '',
        location: pos.location?.toLowerCase() || '',
        location_type: 'On-site',
        employment_type: 'Full-time',
        currently_working: pos.ends_at === null,
      };

      if (existing) {
        existing.roles.push(role);
      } else {
        grouped.set(companyKey, {
          a: i,
          company: pos.company || '',
          company_link: '',
          skills_used: [], // You can parse this from Proxycurl's `skills` if available
          contribution: pos.description || '',
          roles: [role],
        });
      }
    });

    return Array.from(grouped.values());
  };

  const finalData = {
    shortbio: data.summary
      ? data.summary.replace(/\\n/g, ' ').replace(/\s+/g, ' ').replace('+', '').trim()
      : '',
    full_name: data.full_name,
    skills: (data.skills || []).slice(0, 10).map((skill: any) => ({
      logo: '',
      label: skill,
      value: skill.toLowerCase().replace(/\s+/g, '-'),
      category: 'general',
    })),
    certifications:
      data.certifications?.map((cert: any) => ({
        name: cert.name,
        url: cert.url,
        description: `This certifies me for ${cert.name}`,
      })) || [],
    country: getCountry(data.country),
    profile_link: {
      url: '',
      text: '',
    },
    headline: data.headline || '',
    company: data.occupation.split(' at ')[1] || '',
    education: (() => {
      const edu = data.education?.[0];
      return {
        university: edu?.school || '',
        branch: edu?.field_of_study || '',
        start_date: edu?.starts_at
          ? `${edu.starts_at.month.toString().padStart(2, '0')}/${edu.starts_at.year}`
          : '',
        end_date: edu?.ends_at
          ? `${edu.ends_at.month.toString().padStart(2, '0')}/${edu.ends_at.year}`
          : '',
        grade: edu.grade ? edu.grade : 'A',
      };
    })(),
    experience: formatExperiences(data.experiences),
    geo_info: {
      city: data.city || '',
      state: data.state || '',
    },
  };

  let newData = finalData;

  newData.skills = finalData.skills.map((userSkill: any) => {
    const match = findMatchingSkill(userSkill.label);
    return match ? match : userSkill;
  });

  return newData;
}

export function formatScrapingDogData(data: any) {
  function getCountryFromName(name: string): string {
    return (
      countries.find((country) => {
        const [countryName] = country.split('-');
        return countryName?.trim().toLowerCase() === name.trim().toLowerCase();
      }) || ''
    );
  }

  const shortBio = data.about ? data.about : '';

  function formatExperience(data: any) {
    const experienceMap: Record<string, any> = {};

    (data.experience || []).forEach((exp: any) => {
      const companyName = exp.company_name || 'Unknown Company';
      const companyUrl = exp.company_url || '';
      const companyImage = exp.company_image || '';
      const location = exp.location || '';
      const headline = exp.position || '';
      const currentlyWorking = (exp.ends_at || '').toLowerCase() === 'present';

      const role = {
        start_date: parseMonthYear(exp.starts_at),
        end_date: currentlyWorking ? '' : parseMonthYear(exp.ends_at),
        headline,
        location: location.toLowerCase(),
        location_type: 'On-site',
        employment_type: 'Full-time',
        currently_working: currentlyWorking,
      };

      if (experienceMap[companyName]) {
        experienceMap[companyName].roles.push(role);
      } else {
        experienceMap[companyName] = {
          company: companyName,
          company_link: companyUrl,
          company_logo: companyImage,
          skills_used: [],
          contribution: '',
          roles: [role],
        };
      }
    });

    // Return as array and index
    return Object.values(experienceMap).map((entry, i) => ({
      a: i,
      ...entry,
    }));
  }

  // Helper to convert "Jan 2024" → "01/2024"
  function parseMonthYear(dateStr: string) {
    if (!dateStr) return '';
    const [monthStr, yearStr] = dateStr.split(' ');
    const monthMap: Record<string, string> = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };
    const month = monthMap[monthStr as string] || '01';
    return `${month}/${yearStr}`;
  }

  const education = (() => {
    const edu = data.education?.[0];
    const [startYear, endYear] = edu.college_duration
      ? edu.college_duration.split('-').map((y: any) => y.trim())
      : ['', ''];
    return {
      university: edu?.college_name || '',
      branch: edu?.college_degree_field || '',
      start_date: startYear ? `01/${startYear}` : '',
      end_date: endYear ? `01/${endYear}` : '',
      grade: edu?.grade || 'A',
    };
  })();

  const result = {
    full_name: data.fullName || '',
    headline: data.headline || '',
    shortbio: shortBio.slice(0, 300),
    country: getCountryFromName(data.location?.split(',')[2]),
    geo_info: {
      city: data.location?.split(',')[0]?.trim() || '',
      state: data.location?.split(',')[1]?.trim() || '',
    },
    profile_link: {
      url: data.public_identifier ? `https://linkedin.com/in/${data.public_identifier}` : '',
      text: 'LinkedIn Profile',
    },
    experience: formatExperience(data),
    company: data.companyName || '',
    education,
    socials: [],
  };

  return result;
}

export function RemoveMarkdown(markdown: string): string {
  const result = removeMarkdown(markdown).replace(/\s+/g, ' ').trim();

  return result;
}
