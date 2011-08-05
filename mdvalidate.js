var 
	// Dependencies

	
	// Local variables
	
	// Local variables (EXPORTS)
	validate;


function validateValidUntil(entity) {
	
	var 
		diff,
		diffdays;
	
	if (entity.validUntil) {
		
		diff = (entity.validUntil - (new Date()).getTime()) / 1000;
		diffdays = Math.ceil(diff / (3600*24));
		
		if (diff < 0) {
			entity.status.push({status: 0, title: 'Entry is expired (by validUntil attribute) ' + diff + ' seconds ago'});
		} else if (diff < (60*60*3)) {
			entity.status.push({status: 0, title: 'Entry expires in less than three hours (in ' + diff + ' seconds)'});
		} else if (diff > (60*60*24*14)) {
			entity.status.push({status: 2, title: 'Entry has a too long expiration time, more than 14 days (by validUntil attribute) ' + diffdays + ' days'});
		} else {
			entity.status.push({status: 1, title: 'Entry validity (validUntil) is in the range of 3 hours - 14 days'});
		}
	} else {
		entity.status.push({status: 0, title: 'ValidUntil attribute is missing.'});
	}
	
}









function validateSPattributes(entity) {
	
	if (entity.SPSSODescriptor.SingleLogoutService) {
		entity.status.push({status: 1, title: 'SingleLogoutService found'});					
	} else {
		entity.status.push({status: 2, title: 'SingleLogoutService not found'});
	}

	if (entity.SPSSODescriptor.AssertionConsumerService) {
		entity.status.push({status: 1, title: 'AssertionConsumerService found'});
		if (acsIsHTTPS(entity)) {
			entity.status.push({status: 1, title: 'ACS for POST binding is running on HTTPS. Good.'});
		} else {
			entity.status.push({status: 3, title: 'ACS for POST binding is running on HTTP (not https). Not good.'});
		}
	} else {
		entity.status.push({status: 0, title: 'AssertionConsumerService not found'});
	}


	if (entity.AttributeConsumingService && entity.AttributeConsumingService.attributes) {
		entity.status.push({status: 1, title: 'Attribute requirements included'});					
	} else {
		entity.status.push({status: 2, title: 'Attribute requirements not included'});
	}
	
}

function acsIsHTTPS(entity) {
	var i, e;
	if (!entity.SPSSODescriptor) return false;
	if (!entity.SPSSODescriptor.AssertionConsumerService) return false;
	for(i = 0; i < entity.SPSSODescriptor.AssertionConsumerService.length; i++) {
		e = entity.SPSSODescriptor.AssertionConsumerService[i];
		if (e.Binding === 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST') {
			if (e.Location && (e.Location.substr(0,5) === 'https')) return true;
			// console.log('Entity ACS not https [' + entity.entityid + '] ' + e.Location);
		}
	}
	return false;
}

function hasSigningCert(entity) {
	var i, c;
	if (!entity.certs) return false;
	for(i = 0; i < entity.certs.length; i++) {
		c = entity.certs[i];
		if (c.use === 'both' || c.use === 'signing') return true;
	}
	return false;
}

function validateSPCerts(entity) {
	
	if (acsIsHTTPS(entity)) {
		if (hasSigningCert(entity)) {
			entity.status.push({status: 1, title: 'Entity has at least one certificate to be used for signing ([https] not required)'});
		} else {
			entity.status.push({status: 3, title: 'Entity does not have a certificate to be used for signing, but it is not needed becuase the ACS is using HTTPS.'});
		}
	} else {

		if (hasSigningCert(entity)) {
			entity.status.push({status: 1, title: 'Entity has at least one certificate to be used for signing ([http] required)'});
		} else {
			entity.status.push({status: 0, title: 'Entity does not have a certificate to be used for signing, and that is required as the ACS is not using HTTPS.'});
		}
	}
}

function validateMDUI(entity) {
	if (entity.mdui) {
		entity.status.push({status: 1, title: 'Entity does include a mdui:UIInfo element.'});
	} else {
		entity.status.push({status: 2, title: 'Entity does not include a mdui:UIInfo element.'});
		return;
	}
	
	if (entity.mdui.DisplayName && entity.mdui.DisplayName.en) {
		entity.status.push({status: 1, title: 'Entity does include a mdui:UIInfo/DisplayName in english.'});
	} else {
		entity.status.push({status: 2, title: 'Entity does not include a mdui:UIInfo/DisplayName in english.'});
	}
	
	if (entity.mdui.Description && entity.mdui.Description.en) {
		entity.status.push({status: 1, title: 'Entity does include a mdui:UIInfo/Description in english.'});
	} else {
		entity.status.push({status: 2, title: 'Entity does not include a mdui:UIInfo/Description in english.'});
	}
	
}

function validateOrg(entity) {

	if (entity.organizations) {
		entity.status.push({status: 1, title: 'Entity does include a Organization element.'});
	} else {
		entity.status.push({status: 2, title: 'Entity does not include a Organization element.'});
		return;
	}
	
	if (entity.organizations[0].OrganizationName && entity.organizations[0].OrganizationName.en) {
		entity.status.push({status: 1, title: 'Entity does include a OrganizationName element in english.'});
	} else {
		entity.status.push({status: 2, title: 'Entity does not include a OrganizationName element in english.'});
	}
	
	if (entity.organizations[0].OrganizationDisplayName && entity.organizations[0].OrganizationDisplayName.en) {
		entity.status.push({status: 1, title: 'Entity does include a OrganizationDisplayName element in english.'});
	} else {
		entity.status.push({status: 2, title: 'Entity does not include a OrganizationDisplayName element in english.'});
	}
	
	if (entity.organizations[0].OrganizationURL && entity.organizations[0].OrganizationURL.en) {
		entity.status.push({status: 1, title: 'Entity does include a OrganizationURL element in english.'});
	} else {
		entity.status.push({status: 2, title: 'Entity does not include a OrganizationURL element in english.'});
	}
	
}

function validateContacts(entity) {

	
	var contactreqSeverity = {'technical': 0, 'support': 2};
	var contactreq = {'technical': 0, 'support': 0};
	
	if(entity.contacts) {
		for(i = 0; i < entity.contacts.length; i++) {
			// console.log('processing ' + entity.contacts[i].contactType);
			if (contactreq[entity.contacts[i].contactType] !== undefined) {
				contactreq[entity.contacts[i].contactType]++;
			}
		}
	}
	
	for(var key in contactreq) {
		if (!contactreq.hasOwnProperty(key)) continue;
		if (contactreq[key] === 0) {
			entity.status.push(
				{
					status: contactreqSeverity[key],
					title: 'No contacts of type (' + key + ') found in metadata'
				}
			);
		} else {
			entity.status.push({status: 1, title: 'At least one contact of type (' + key + ') found in metadata (' + contactreq[key]  + ' found)'}
			);

		}
	}

}

function validURI(uri) {
	if (uri.substr(0,4) === 'urn:') return true;
	if (uri.substr(0,6) === 'https:') return true;
	if (uri.substr(0,5) === 'http:') return true;
	return false;
}

function validateURI(entity) {
	if (validURI(entity.entityid)) {
		entity.status.push({status: 1, title: 'EntityID seems to pass a basic syntax check.'});
	} else {
		entity.status.push({status: 0, title: 'EntityID may be in an invalid (irregular) format.'});
	}
}


validate = function(entity) {
	
	var key, status, i;
	
	// Iterate all entries.
	for (key in entity) {
		if (entity.hasOwnProperty(key)) {
			
			validateURI(entity[key]);
			validateValidUntil(entity[key]);
			validateOrg(entity[key]);
			validateContacts(entity[key]);
			
			if (entity[key].SPSSODescriptor) {
			
				entity[key].status.push({status: 3, title: 'Detected as SP'});
				validateSPattributes(entity[key]);
				validateSPCerts(entity[key]);
				
				// should be moved outside SP only, when idpsso desciptor parsing is implemented
				validateMDUI(entity[key]);
				
			} else {
				entity[key].status.push({status: 3, title: 'Detected as IdP'});
			}
			
			status = 1;
			for(i = 0; i < entity[key].status.length; i++) {
				if (entity[key].status[i].status === 2 && status === 1) status = 2;
				if (entity[key].status[i].status === 0) status = 0;
				// console.log('Check status [' + entity[key].status[i].status + ']');
			}

			entity[key].totalStatus = status;
			
		}
	}
	
	
}



exports.validate = validate;

