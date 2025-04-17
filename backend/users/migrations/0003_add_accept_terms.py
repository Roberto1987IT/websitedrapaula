from django.db import migrations

class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_notetoken_owner'),
    ]

    operations = [
        migrations.RunSQL(
            "ALTER TABLE users_customuser ADD COLUMN accept_terms BOOLEAN NOT NULL DEFAULT 0;",
            "ALTER TABLE users_customuser DROP COLUMN accept_terms;"
        ),
    ]
